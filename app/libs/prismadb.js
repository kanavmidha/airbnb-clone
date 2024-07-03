import { PrismaClient } from "@prisma/client";

let prisma

if (typeof globalThis.prisma === 'undefined') {
    // first we check if the global prisma variable is defined or not. if undefined, the prisma client hasn't been initiated yet.
    prisma = new PrismaClient()
    // if not, a new PrismaClient instance has been assigned to a prisma variable
    if(process.env.NODE_ENV !== 'production') {
        globalThis.prisma = prisma
        // if the node environment is development (not production), the gloabl prisma variable is assigned to the prisma client defined earlier. this is done to make sure it does not re-renders and create multiple prisma instances and it exists through reloads.
    }
} else {
    prisma = globalThis.prisma
    // if it is defined, the prisma variable is set to the existing prisma global variable that has the prisma client initiated.
}

export default prisma
