const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType } = require('graphql')

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
                name:{type:new GraphQLNonNull(GraphQLString)},
                email:{type: new GraphQLNonNull(GraphQLString)},
                phone:{type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(parent, args){
                const newClient = new ClientModel({
                    name:args.name,
                    email:args.email,
                    phone:args.phone,
                })
                return newClient.save();
            }
        },
        // delete client
        deleteClient:{
            type: ClientType,
            args: {
                id:{type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(p,args){
                const res= ClientModel.findByIdAndDelete(args.id)
                return res
            }
        },
        // add project
        addProject:{
            type: ProjectsType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                description:{type: new GraphQLNonNull(GraphQLString)},
                status:{
                    type: new GraphQLEnumType({
                        name:'ProjectStatus',
                        values:{
                            'new':{value:'Not Started'},
                            'progress':{value:'In Progress'},
                            'completed':{value:'Completed'},
                        }
                    }),defaultValue: 'Not Started'
                },
                clientId:{type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(p, args){
                const newPorject = new ProjectModel({
                    name:args.name,
                    description:args.description,
                    status:args.status,
                    clientId:args.clientId,
                })
                return newPorject.save();
            }

        },
        // delete Project
        deleteProject:{
            type: ProjectsType,
            args:{
                id:{type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(p, args){
                return ProjectModel.findByIdAndDelete(args.id)
            }
        }

    }
})









module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})