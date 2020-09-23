import {
    /* Protocol */
    KoconutComparable,

    /* Tool */
    KoconutPrimitive, KoconutOpener
} from "../../../module.internal"

type targetBooleanLikeType = boolean | KoconutPrimitive<boolean>

export class KoconutBoolean extends KoconutPrimitive<boolean> implements Boolean {

    constructor(boolean : boolean | null = null) {
        super()
        this.data = boolean == null ? false : boolean
    }


    /**
     * 
     */
    async retrieve() : Promise<KoconutBoolean> {

        await super.retrieve()
        return this

    }

    /** @ignore */
    valueOf() : boolean {
        return this.data!
    }


    and(other : targetBooleanLikeType) : KoconutBoolean {

        const koconutToReturn = new KoconutBoolean();
        (koconutToReturn as any as KoconutOpener<boolean>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                var otherBoolean = false
                if(other instanceof KoconutPrimitive)
                    otherBoolean = await other.yield()
                else otherBoolean = other
                return this.data! && otherBoolean
            })
        return koconutToReturn

    }


    not() : KoconutBoolean {

        const koconutToReturn = new KoconutBoolean();
        (koconutToReturn as any as KoconutOpener<boolean>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                return !this.data!
            })
        return koconutToReturn

    }


    or(other : targetBooleanLikeType) : KoconutBoolean {

        const koconutToReturn = new KoconutBoolean();
        (koconutToReturn as any as KoconutOpener<boolean>)
            .setPrevYieldable(this)
            .setProcessor(async () => { 
                var otherBoolean = false
                if(other instanceof KoconutPrimitive)
                    otherBoolean = await other.yield()
                else otherBoolean = other
                return this.data! || otherBoolean
            })
        return koconutToReturn

    }


    xor(other : targetBooleanLikeType) : KoconutBoolean {

        const koconutToReturn = new KoconutBoolean();
        (koconutToReturn as any as KoconutOpener<boolean>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                var otherBoolean = false
                if(other instanceof KoconutPrimitive)
                    otherBoolean = await other.yield()
                else otherBoolean = other
                return this.data! != otherBoolean
            })
        return koconutToReturn

    }

}