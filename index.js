

// Problem 1 - stripPrivateProperties - 2 points
// Given an array of objects, create a new array where the objects inside don't include the supplied properties.


exports.stripPrivateProperties = (props,objs) =>{
    props.forEach(prop =>{
          objs.forEach(obj =>{
             delete obj[prop];
          })
       })

    return objs;
}

// Problem 2 - excludeByProperty - 2 points
// Given an array of objects, create a new array which excludes objects based on a supplied property.

exports.excludeByProperty = (prop,objs) =>{
   return objs.filter(obj => {
       return !obj.hasOwnProperty?.(prop)})
}

// Problem 3 - sumDeep - 3 points
// Compute sums based on deep properties.

exports.sumDeep = (inputs) =>{
    return inputs.map(input =>{
        const output = {};
        Object.entries(input).forEach(([key,value]) =>{
            if(Array.isArray(value)){
                output[key] = value.reduce((aggregate,subObj) =>{
                    const subVal = subObj?.val || 0;
                    return aggregate + subVal;
                },0)
            } else {
                output[key] = value;
            }
        })
        return output;
    })
}


// problem 4 - applyStatusColor - 4 points
// Create a function which creates an array of objects where each object includes its matching status code.
//  The association between colors and status codes are supplied as the first argument where the keys
//   identify the colors, 
//  and the values are arrays of status codes matching the color. You can assume that a status code can only belong to one color.

exports.applyStatusColor = (codeColors,statusObjects)=>{
    const output = [];
    statusObjects.forEach(statusObj =>{
        const code = statusObj?.status;
        const color = Object.keys(codeColors).find(key =>{
            return codeColors[key].includes(code);
        })
        if (code && color){
            output.push({
                status:code,
                color
            })
        }
    })
    return output;
}

// Problem 5 - createGreeting - 2 points
// Figure out what to do from the test.

exports.createGreeting = (greetingFunc, ...presets)=>{
    return (...greetingArgs) => greetingFunc(...presets,...greetingArgs)
}


// Problem 6 - setDefaults - 3 points
// Create a function which adds default properties to an object if necessary

exports.setDefaults = (defaults) =>{
    return (obj)=>{
        Object.entries(defaults).forEach(([key,value]) =>{
            if(obj[key] ===undefined){
                obj[key] = value;
            }
        })
        return obj;
    }
}



// Problem 7 - fetchUserByNameAndUsersCompany - 5 points
// Create a function that fetches a user by name, the user's company and a status.



exports.fetchUserByNameAndUsersCompany = async (userName,services) =>{
    const [users,status] = await Promise.all([services.fetchUsers(),services.fetchStatus()]);

    const user = users.find(u => u.name === userName);
    if(!user){
        return;
    }
    const company = await services.fetchCompanyById(user.companyId);

    return {
        user,
        status,
        company
    }
}