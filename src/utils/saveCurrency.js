const Currency = require("../models/currencies")
const fp = require("../models/fp")

saveCurrency = async function (title, data) {
    var provider = await fp.findOne({
        title: title
    })
    var currencyData = {
        forexProvider: provider._id,
        ...data
    }
    var currency = new Currency(currencyData)
    currency= await currency.save()
    return currency
}

module.exports = saveCurrency;