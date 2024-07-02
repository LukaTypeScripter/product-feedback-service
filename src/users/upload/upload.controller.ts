import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException, Param,
  Post, Res,
  UploadedFile,
  UseInterceptors
} from "@nestjs/common";
import * as fs from 'fs';
import * as path from 'path';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('upload')
export class UploadController {
  private readonly uploadsDirectory = "C:/Users/Administrator/Desktop/full-stack/product-feedback-service/uploads";
  @Post('file')
  @UseInterceptors(FileInterceptor('file') as any)
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is required');
    }
    return {
      filename: file.filename,
      originalname: file.originalname,
      url: `http://localhost:3000/uploads/${file.filename}`,
    };
  }

  @Get(':filename')
  async serveFile(@Param('filename') filename: string, @Res() response: any) {
    const filePath = path.join(this.uploadsDirectory, filename);
    try {
      const stat = fs.statSync(filePath);
      if (!stat.isFile()) {
        throw new NotFoundException('File not found');
      }
      return response.sendFile(filePath);
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw new NotFoundException('File not found');
      } else {
        throw error;
      }
    }
  }



}
