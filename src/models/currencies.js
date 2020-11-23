const mongoose = require("mongoose");
const fp= require("./fp")

const currencySchema = new mongoose.Schema({
    forexProvider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'fp',
        required: true
    },
    USDEUR:{
        rate:{
            type:mongoose.SchemaTypes.String,
            required:true
        },
        bid:{
            type:mongoose.SchemaTypes.String,
            required:true
        },
        ask:{
            type:mongoose.SchemaTypes.String,
            required:true
        }
    },
    USDUSD:{
        rate:{
            type:mongoose.SchemaTypes.String,
            required:true
        },
        bid:{
            type:mongoose.SchemaTypes.String,
            required:true
        },
        ask:{
            type:mongoose.SchemaTypes.String,
            required:true
        }
    },
    USDINR:{
        rate:{
            type:mongoose.SchemaTypes.String,
            required:true
        },
        bid:{
            type:mongoose.SchemaTypes.String,
            required:true
        },
        ask:{
            type:mongoose.SchemaTypes.String,
            required:true
        }
    },
    EURUSD:{
        rate:{
            type:mongoose.SchemaTypes.String,
            required:true
        },
        bid:{
            type:mongoose.SchemaTypes.String,
            required:true
        },
        ask:{
            type:mongoose.SchemaTypes.String,
            required:true
        }
    },
    EUREUR:{
        rate:{
            type:mongoose.SchemaTypes.String,
            required:true
        },
        bid:{
            type:mongoose.SchemaTypes.String,
            required:true
        },
        ask:{
            type:mongoose.SchemaTypes.String,
            required:true
        }
    },
    EURINR:{
        rate:{
            type:mongoose.SchemaTypes.String,
            required:true
        },
        bid:{
            type:mongoose.SchemaTypes.String,
            required:true
        },
        ask:{
            type:mongoose.SchemaTypes.String,
            required:true
        }
    },
    INREUR:{
        rate:{
            type:mongoose.SchemaTypes.String,
            required:true
        },
        bid:{
            type:mongoose.SchemaTypes.String,
            required:true
        },
        ask:{
            type:mongoose.SchemaTypes.String,
            required:true
        }
    },
    INRUSD:{
        rate:{
            type:mongoose.SchemaTypes.String,
            required:true
        },
        bid:{
            type:mongoose.SchemaTypes.String,
            required:true
        },
        ask:{
            type:mongoose.SchemaTypes.String,
            required:true
        }
    },
    INRINR:{
        rate:{
            type:mongoose.SchemaTypes.String,
            required:true
        },
        bid:{
            type:mongoose.SchemaTypes.String,
            required:true
        },
        ask:{
            type:mongoose.SchemaTypes.String,
            required:true
        }
    }
    
}, { timestamps: { createdAt: true, updatedAt: true } });


const Currency = mongoose.model('Currency', currencySchema);

module.exports= Currency;