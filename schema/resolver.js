// @flow
import type {SCP} from './schematyped';

interface ID {
    ID: string
}

interface IDs {
    IDs: Array<string>
}

type context = {
    db: any,
    app: string
}

async function getSCP(id: string, db): SCP {
    const scp: ?any = await db.findOne({ID: id});
    if (!scp) throw new Error(`Couldn't find post with id ${id}`);
    return scp;
}

const resolvers = {
        Query: {
            SCPs: async (root: any, args: any, context: context) => context.db.find({}),
            SCP: async (root: any, args: ID, context: context): SCP => await getSCP(args.ID, context.db),
            SCPsWithIDArray: async (root: any, args: IDs, context: context): Array<SCP> => {
                const scps: Array<SCP> = [];
                for (const id of args.IDs) {
                    scps.push(await getSCP(id,context.db));
                }
                return scps;
            }
        }
    }
;

export default resolvers;