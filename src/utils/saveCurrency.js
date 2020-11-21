const Currency = require("../models/currencies")
const fp = require("../models/fp")

saveCurrency = async function (title, data) {
    var provider = await fp.findOne({
        title: title
    })
    console.log(provider)
    var USDINR = [], EURINR = [], USDEUR = []
    var profile = {
        forexProvider: provider._id,
        title: provider.title,
        USDEUR: [...USDEUR, data.response[0]],
        USDINR: [...USDINR, data.response[1]],
        EURINR: [...EURINR, data.response[2]]

    }
    var prof = new Currency(profile)
    console.log(prof)
    prof = await prof.save()
    return prof
}

module.exports = saveCurrency;