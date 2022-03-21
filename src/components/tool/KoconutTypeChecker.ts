import { KoconutComparable, KoconutEquatable } from '../../module';

export const KoconutTypeChecker = {
  checkIsComparable: function (target: any): target is KoconutComparable {
    if (target && target.compareTo && typeof target.compareTo === 'function')
      return true;
    else return false;
  },

  checkIsEquatable: function (target: any): target is KoconutEquatable {
    if (target && target.equalsTo && typeof target.equalsTo === 'function')
      return true;
    else return false;
  },
};
