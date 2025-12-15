import CredentialsProvider  from "next-auth/providers/credentials";
import { prisma }  from "@repo/db/client";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name:"credentials",
      credentials: {
        
        phone : {label:"Phone Number",type:"text",placeholder:"+91xxxxxxxxx"},
        password:{label:"Password",type:"text",placeholder:"Enter Your Pass"},
        age:{label:"Age",type:"text",placeholder:"Enter You Age"},
        email:{label:"Email",type:"text",placeholder:"Enter you mail"}
      },
      
      async authorize(credentials:any) {
          const hashpass = await bcrypt.hash(credentials.password, 10);
          const existingUser = await prisma.user.findFirst({
              where: {
                  number: credentials.number
              }
          });
            
          if (existingUser) {
              const hashpassCheck = await bcrypt.compare(credentials.password, existingUser.password);
             if (hashpassCheck) {
               return {
                   id: existingUser.id.toString(),
                   name:existingUser.name,
                   email:existingUser.email
               }
             } 
              return null;
          } 
          
          try {
              const user = await prisma.user.create({
                  data: {
                      number: credentials.number,
                      password: hashpass,
                      age:credentials.age,
                      email:credentials.email
                  }
              });
              console.log("created user: ",user)
              return {
                id:user.id,
                number:user.number,
                password:user.password,
                email:user.email
              }
              
          } catch (error) {
              console.log(error);
          }
          return null
      },
    })
  ],
  secret:process.env.JWT_SECRET || "osman",
  callbacks: {
      async session({ token, session }){
      session.user.id = token.sub
      
      return session
    }
  }
}