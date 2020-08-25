'use strict'

import { KoconutCollection } from "./KoconutCollection"
import { KoconutPrimitive, KoconutOpener } from "../KoconutBase"

export class KoconutString extends KoconutCollection<string, Array<string>> {

    // String
    static fromCollection(
        collection : KoconutCollection<string, Array<string>>
    ) : KoconutString {

        const koconutToReturn = new KoconutString(collection.data)
        koconutToReturn.processor = collection.processor
        koconutToReturn.prevYieldable = collection.prevYieldable
        return koconutToReturn

    }

    toString() : KoconutPrimitive<string> {

        const koconutToReturn = new KoconutPrimitive<string>();
        (koconutToReturn as any as KoconutOpener<string>).setPrevYieldable(this).setProcessor(async () => {
            return this.data!.join('')
        })
        return koconutToReturn

    }

}