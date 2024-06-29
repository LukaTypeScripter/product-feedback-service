/* eslint-disable prettier/prettier */
export class CreateUserDto {
    readonly name: string;
    readonly username: string;
    readonly image: string;
  }
  
  export class CreatePostDto {
    readonly title: string;
    readonly category: string;
    readonly description: string;
  }
  
  export class CreateCommentDto {
    readonly content: string;
    readonly postId: number;
    readonly userId: number;
  }