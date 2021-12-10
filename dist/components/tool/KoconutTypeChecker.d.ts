import { KoconutComparable, KoconutEquatable } from '../../module';
export declare const KoconutTypeChecker: {
  checkIsComparable: (target: any) => target is KoconutComparable;
  checkIsEquatable: (target: any) => target is KoconutEquatable;
};
