const { GraphQLServer } = require("graphql-yoga");
const { Prisma } = require("prisma-binding");
const resolvers = {
    Query: {
        feed(parent, args, ctx, info) {
            return ctx.db.query.fonts({}, info);
        },
        fontById(parent, { id }, ctx, info) {
            return ctx.db.query.font({ where: { id: id } }, info);
        },
        fontsByFamily(parent, { family }, ctx, info) {
            return ctx.db.query.fonts({ where: { family: family } }, info);
        }
    },
    Mutation: {
        createFont(
            parent,
            {
                family,
                foundry,
                category,
                variants,
                subsets,
                version,
                lastModified
            },
            ctx,
            info
        ) {
            return ctx.db.mutation.createFont(
                {
                    data: {
                        family,
                        foundry,
                        category,
                        variants,
                        subsets,
                        version,
                        lastModified
                    }
                },
                info
            );
        }
    }
};

const server = new GraphQLServer({
    typeDefs: "./src/schema.graphql",
    resolvers,
    context: req => ({
        ...req,
        db: new Prisma({
            typeDefs: "src/generated/prisma.graphql",
            endpoint: "http://localhost:4466/node-basic/dev", // the endpoint of the Prisma DB service
            secret: "mysecret123", // specified in database/prisma.yml
            debug: true // log all GraphQL queryies & mutations
        })
    })
});

server.start(() => console.log("Server is running on http://localhost:4000"));
