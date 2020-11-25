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
            default:"1",
        },
        bid:{
            type:mongoose.SchemaTypes.String,
            default:"1",
        },
        ask:{
            type:mongoose.SchemaTypes.String,
            default:"1",
        }
    },
    USDINR:{
        rate:{
            type:mongoose.SchemaTypes.String,
            
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
            default:"1",
        },
        bid:{
            type:mongoose.SchemaTypes.String,
            default:"1",
        },
        ask:{
            type:mongoose.SchemaTypes.String,
            default:"1",
        }
    },
    EURINR:{
        rate:{
            type:mongoose.SchemaTypes.String,
            
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
            default:"1",
        },
        bid:{
            type:mongoose.SchemaTypes.String,
            default:"1",
        },
        ask:{
            type:mongoose.SchemaTypes.String,
            default:"1",
        }
    }
    
}, { timestamps: { createdAt: true, updatedAt: true } });


const Currency = mongoose.model('Currency', currencySchema);

module.exports= Currency;