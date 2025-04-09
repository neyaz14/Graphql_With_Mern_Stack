const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList } = require('graphql')
const {projects, clients} = require('../../sampleData')
// const 
const ProjectModel = require('../Models/ProjectSchema')
const ClientModel = require('../Models/ClientSchema')




const ClientType = new GraphQLObjectType({
    name:'Client',
    fields:()=>({
        id: {type: GraphQLID},
        name:{type:GraphQLString},
        email:{type:GraphQLString},
        phone:{type:GraphQLString}
    })
})
const ProjectsType = new GraphQLObjectType({
    name:'Project',
    fields:()=>({
        id: {type: GraphQLID},
        clientId:{type:GraphQLString},
        name:{type:GraphQLString},
        description:{type:GraphQLString},
        status:{type:GraphQLString},
        client:{
            type: ClientType,
            resolve(parent, args){
                return ClientModel.findById(parent.clientId)
            }

        }
    })
})


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        client:{
            type: ClientType,
            args:{id:{type: GraphQLID}},
            resolve(parent, args){
                return ClientModel.findById(args.id)
            }
        },
        clients:{
            type: new GraphQLList(ClientType),
            resolve(p,args){
                return ClientModel.find()
            }
        },

    // ! -------
        Projects:{
            type:new GraphQLList(ProjectsType),
            resolve(p, args){
               return ProjectModel.find();
            }
        },
        project:{
            type: ProjectsType,
            args:{id:{type: GraphQLID}},
            resolve(parent, args){
                return ProjectModel.findById(args.id)
            }
        },
    }
})



const mutation = new GraphQLObjectType({
    name:"Mutation",
    fields:{
        addClient:{
            type: ClientType,
            args:{
                
            }
        }
    }
})









module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})