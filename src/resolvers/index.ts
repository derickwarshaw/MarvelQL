import { Query } from './Query';
import { makeExecutableSchema } from 'graphql-tools';
import { extractFragmentReplacements } from 'prisma-binding';
import { FragmentReplacement } from 'graphql-binding';
import { MergeSchemaHelper } from '../utils/MergeSchemaHelper';
import { importSchema } from 'graphql-import';
import { GraphQLDateTime } from 'graphql-iso-date';
import * as path from 'path';

const resolvers = {
	Query,
	DateTime: GraphQLDateTime
};

const mergedSchema: MergeSchemaHelper = new MergeSchemaHelper();
mergedSchema.addSchema(
	makeExecutableSchema({
		typeDefs: importSchema(path.join(__dirname, '../schema.graphql')),
		resolvers,
		resolverValidationOptions: {
			requireResolversForResolveType: false
		} as any
	})
);

export const schema: any = mergedSchema.getSchema();

export const fragmentReplacements: FragmentReplacement[] = extractFragmentReplacements(
	resolvers
);
