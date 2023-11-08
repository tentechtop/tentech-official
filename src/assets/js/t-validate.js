/* eslint-disable no-prototype-builtins */
// const numberReg = /^-?[1-9][0-9]?.?[0-9]*$/
// const intReg = /^-?[1-9][0-9]*$/
// const phoneReg = /^1[0-9]{10,10}$/
// const emailReg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
// const passwordReg = /^.{4,32}$/
// const inviteCodeReg = /^[a-zA-Z0-9]{6,16}$/
const pattern = {
	"number": /^-?[1-9][0-9]?.?[0-9]*$/,
	"integer": /^-?[1-9][0-9]*$/,
	// "boolean": "",
	// 中国内地的固定电话
	// "telphone": /^[0-9]{7,12}$/,
	// 中国内地的手机号码
	"phone": /^1[0-9]{10,10}$/,
	// 全球版手机号码
	"telphone": /^\+?[0-9]+([- ]?[0-9]+)*$/,
	"email": /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
	// "email": /^\S+?@\S+?\.\S+?$/,
	"password": /^.{4,32}$/,
	"code": /^[a-zA-Z0-9]{4,10}$/,
	"idcard": /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
	"url": new RegExp(
		"^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$",
		'i')
};

const FORMAT_MAPPING = {
	"int": 'integer',
	"bool": 'boolean',
	"double": 'number',
	"long": 'number',
	"eq": 'equals',
	"equalsTo": 'equals',
	// "password": 'string'
	// "fileurls": 'array'
}

const RuleValidatorHelper = {
	required(rule, value) {
		if (rule.required === true || rule.required === "required") {
			if (isEmptyValue(value)) {
				return false
			}
		}
		return true
	},
	format(rule, value) {
		// 没有值时，不用检查
		if (isEmptyValue(value)) {
			return true
		}
		const format = FORMAT_MAPPING[rule.format] ? FORMAT_MAPPING[rule.format] : rule.format
		switch (format) {
			case 'number':
				return pattern.number.test(value)
			case 'integer':
				return pattern.int.test(value)
			case 'boolean':
				if (value !== true && value !== false) {
					return false
				}
				return true
			case 'phone':
				return pattern.phone.test(value)
			case 'telphone':
				return pattern.telphone.test(value)
			case 'email':
				return pattern.email.test(value)
			case 'password':
				return pattern.password.test(value)
			case 'inviteCode':
				return pattern.inviteCode.test(value)
			case 'idcard':
				return pattern.idcard.test(value)
			case 'url':
				return pattern.url.test(value)
		}
		return true
	},
	range(rule, value) {
		if (rule.range && Array.isArray(range) && rule.range.length > 0) {
			return rule.range.includes(value)
		}
		return true
	},
	rangeNumber(rule, value) {
		value = +value
		if (!isEmptyValue(rule.minimum)) {
			if (value < rule.minimum) {
				return false
			}
		}
		if (!isEmptyValue(rule.maximum)) {
			if (value > rule.maximum) {
				return false
			}
		}
		return true
	},
	rangeLength(rule, value) {
		if (!isEmptyValue(rule.minLength)) {
			if (value.length < rule.minLength) {
				return false
			}
		}
		if (!isEmptyValue(rule.maxLength)) {
			if (value.length > rule.maxLength) {
				return false
			}
		}
		return true
	},
	pattern(rule, value) {
		if (isEmptyValue(value)) {
			return true
		}
		if (rule.pattern) {
			let p = rule.pattern
			if (typeof p === "string") {
				p = new RegExp(p)
			}
			return p.test(value)
		}
		return true
	}
}


function isEmptyValue(value) {
	if (value === undefined || value === null) {
		return true;
	}

	if (typeof value === 'string' && !value) {
		return true;
	}

	if (Array.isArray(value) && !value.length) {
		return true;
	}

	if (typeof value === 'object' && !Object.keys(value).length) {
		return true;
	}

	return false;
}

function formatMessage(fieldName, errorMessage, params) {
	let msg = errorMessage
	if (msg && params) {
		if (Array.isArray(params)) {
			for (const index in params) {
				msg = msg.replace("%" + index + "%", params[index])
			}
		} else if (typeof params === "object") {
			for (const paramName in params) {
				msg = msg.replace("%" + paramName + "%", params[paramName])
			}
		}
	}
	return {
		isOk: false,
		field: fieldName,
		errorMessage: msg
	}
}


function validateRule(fieldName, ruleConfig, allData, allRuleConfig) {
	const res = {
		isOk: true,
		field: fieldName,
		errorMessage: ''
	}
	const value = allData[fieldName]
	const ruleArr = ruleConfig.rules
	const label = ruleConfig.label ? ruleConfig.label : fieldName
	const validateRule = {}
	if (!ruleArr || !ruleArr.length || ruleArr.length <= 0) {
		return res
	}
	for (const index in ruleArr) {
		const r = ruleArr[index]
		if (r.hasOwnProperty("required")) {
			if (!validateRule.required) {
				validateRule.required = r
			}
		} else if (r.hasOwnProperty("format")) {
			if (!validateRule.format) {
				validateRule.format = r
			}
		} else if (r.hasOwnProperty("equals")) {
			if (!validateRule.equals) {
				validateRule.equals = r
			}
		} else if (r.hasOwnProperty("range")) {
			if (!validateRule.range) {
				validateRule.range = r
			}
		} else if (r.hasOwnProperty("minimum") || r.hasOwnProperty("maximum")) {
			if (!validateRule.rangeNumber) {
				validateRule.rangeNumber = r
			}
		} else if (r.hasOwnProperty("minLength") || r.hasOwnProperty("maxLength")) {
			if (!validateRule.rangeLength) {
				validateRule.rangeLength = r
			}
		} else if (r.hasOwnProperty("pattern")) {
			if (!validateRule.pattern) {
				validateRule.pattern = r
			}
		} else if (r.hasOwnProperty("validateFunction")) {
			if (!validateRule.validateFunction && (typeof r.validateFunction === "function")) {
				validateRule.validateFunction = r
			}

		}
	}

	// 优先校验是否必填
	// format 支持的格式目前有9种，可以自己添加格式
	const checkModes = ["required", "equals", "format", "range", "rangeNumber", "rangeLength", "pattern",
		"validateFunction"
	]
	// let isRequired = false
	for (const key in checkModes) {
		const mode = checkModes[key]
		const rule = validateRule[mode]
		if (rule) {
			const msgParams = {
				label
			}
			if (mode === "equals") {
				const equalsField = rule.equals
				const equalsFieldValue = allData[equalsField]
				if (equalsFieldValue !== value) {
					msgParams.equalsTo = equalsField
					if (allRuleConfig && allRuleConfig[equalsField] && allRuleConfig[equalsField].label) {
						msgParams.equalsTo = allRuleConfig[equalsField].label
					}
					return formatMessage(fieldName, rule.errorMessage, msgParams)
				}
			} else if (mode === "validateFunction") {
				// if(isRequired && RuleValidatorHelper.isEmptyValue()){

				// }
				let _errMsg = ''
				const rs = rule.validateFunction(rule, value, allData, function (errMsg) {
					if (errMsg && errMsg.length > 0) {
						_errMsg = errMsg
					} else {
						_errMsg = rule.errorMessage
					}
				})
				if (_errMsg && _errMsg.length > 0) {
					return formatMessage(fieldName, _errMsg, msgParams)
				}
				if (rs) {
					if (rs.isOk) {
						continue
					}
					return res
				} else {
					return formatMessage(fieldName, rule.errorMessage, msgParams)
				}
			} else if (!RuleValidatorHelper[mode](rule, value)) {
				if (mode === "rangeNumber") {
					msgParams.min = rule.minimum
					msgParams.max = rule.maximum
				} else if (mode === "rangeLength") {
					msgParams.minLength = rule.minLength
					msgParams.maxLength = rule.maxLength
				}
				return formatMessage(fieldName, rule.errorMessage, msgParams)
			}
		}
	}

	return res
}

export default {
	isNumber(val) {
		return pattern.number.test(val)
	},
	isInt(val) {
		return pattern.int.test(val)
	},
	isPhone(val) {
		return pattern.phone.test(val)
	},
	isTelphone(val) {
		return pattern.telphone.test(val)
	},
	isEmail(val) {
		return pattern.email.test(val)
	},
	isPassword(val) {
		return pattern.password.test(val)
	},
	isInviteCode(val) {
		return pattern.inviteCode.test(val)
	},
	isIdcard(val) {
		return pattern.idcard.test(val)
	},
	isUrl(val) {
		return pattern.url.test(val)
	},
	isEmptyValue(value) {
		// return RuleValidatorHelper.isEmptyValue(value)
		return isEmptyValue(value)
	},
	validate(data, rulesConfig) {
		// rulesConfig规则，兼容uni-forms的rules规则
		const res = {
			isOk: true,
			field: '',
			errorMessage: ''
		}
		if (!rulesConfig) {
			return res
		}
		for (const fieldName in rulesConfig) {
			const result = validateRule(fieldName, rulesConfig[fieldName], data, rulesConfig)
			if (!result || !result.isOk) {
				return result
			}
		}
		return res
	},
	validateField(checkFieldArr, data, rulesConfig) {
		// rulesConfig规则，兼容uni-forms的rules规则
		// 只检测部分字段，用于分步提交表单的场景
		const res = {
			isOk: true,
			field: '',
			errorMessage: ''
		}
		if (!rulesConfig) {
			return res
		}
		for (const fieldName in rulesConfig) {
			// 如果不再检测范围内，则跳过检测
			if (!checkFieldArr.includes(fieldName)) {
				continue
			}
			const result = validateRule(fieldName, rulesConfig[fieldName], data, rulesConfig)
			if (!result || !result.isOk) {
				return result
			}
		}
		return res
	},
	validateIgnoreField(ignoreFieldArr, data, rulesConfig) {
		// rulesConfig规则，兼容uni-forms的rules规则
		// 忽略部分字段，对ignoreFieldArr的字段不进行检测
		const res = {
			isOk: true,
			field: '',
			errorMessage: ''
		}
		if (!rulesConfig) {
			return res
		}
		for (const fieldName in rulesConfig) {
			// 如果字段被忽略检测，则跳过检测
			if (ignoreFieldArr && ignoreFieldArr.length && ignoreFieldArr.includes(fieldName)) {
				continue
			}
			const result = validateRule(fieldName, rulesConfig[fieldName], data, rulesConfig)
			if (!result || !result.isOk) {
				return result
			}
		}
		return res
	}
}
