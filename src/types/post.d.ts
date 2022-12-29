import Posts from "../models/postModel";

 
interface IPost {
  title: string;
  description: string;
  images: string[];
  sharedFrom: string | object;
  tags: string[];
}
interface IUserPost extends IPost{
    id?:string
    userid:string
    sharedBy:(id:number) =>Promise<Posts[]>
}
interface ISharePost extends IUserPost{
    sharedFrom:string
}
interface IPostAttributes extends IUserPost{
    shared
}



export { IPost,IUserPost ,ISharePost};
