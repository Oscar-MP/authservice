'use strict'

module.exports = {
  // Main utils functions

  isEmpty: ( input ) => {
    // Checks if the input is empty or undefined
    return  input === null                  ||
            input === undefined             ||
            // input.replace(/\s/g, '') === '' ||
            (input.isArray ? input.length === 0 :
              (typeof input === 'object' ? Object.keys(input).length === 0 : false)
            );
  },
  mergeObjects: (object1, object2) => {
    // Este método se puede mejorar para mergear todos los objetos que sean y no solo dos
    return Object.assign(object1, object2);
  },
  isInObject: (object, keys, allowEmpty) => {
    // Checks if there is a key or a set of keys in the given object.
    // Keys must be an array

    allowEmpty = allowEmpty === undefined;

    for ( let k of keys ) {
      if (!object[k] || (!allowEmpty && exports.isEmpty(object[k]))) return false;
    }

    return true;
  },
  removeFromObject: ( object, paramsToRemove, cloneObject = false ) => {
    // Removes a set of parameters from a given object. paramsToRemove should be an array.
    // If cloneObject is true, the original object won't be modified and a new one will be created.
    // If cloneObject is true then the return of the function should be stored in a variable to work with, the
    // original data will remain still.
    var obj = cloneObject ? { ...object } : object || {};

    for ( let param of  paramsToRemove ) {

      if (Object.keys(obj).includes(param)) {
        delete obj[param]
      }
    }
    return obj;
  },
  /**
    * From here we have clasified the methods
    */

  date: {
    time: () => {
      // Returns the time in hh:mm:ss
      let t = new Date();
      return `${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}`;
    },
    today: () => {
      // Returns the date of today in dd/mm/aaaa
      let t = new Date();
    }
  },
  validator: {
    isEmail: (value) => {
        return /^(")?(?:[^\."\s])(?:(?:[\.])?(?:[\w\-!#$%&'*+/=?^_`{|}~]))*\1@(\w[\-\w]*\.){1,5}([A-Za-z]){2,6}$/.test(value);
    },
    isPhone: ( num ) => {
        return /^[0-9]{9}$/.test(num);
    },
    isAddress: ( ip ) => {
        if (/^(\d{1,3}\.){3}(\d){1,3}$/.test(ip)) {
            for ( let word of ip.split('.')) {
                if (word > 255) return false;
            }
            return true;
        }

        return false;
    }
  }
}
