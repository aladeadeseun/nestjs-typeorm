/* eslint-disable prettier/prettier */
import { Public } from '@/auth/decorator/is-public';
import { CurrentUser } from '@/auth/decorator/current-user.decorator';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { SaveBioDto } from '@/users/dto/save-bio.dto';
import { UsersService } from '@/users/users.service';
import { Body, Controller, Get, Post, StreamableFile, UnprocessableEntityException, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { User } from '@/users/entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from "multer"
import { extname } from 'path';
import { AVATAR_UPLOAD_DIR, MAX_AVATAR_SIZE } from '@/common/constant';


@Controller('users')
export class UsersController {
    
    constructor(private readonly userService: UsersService){}

    @Get()
    fetchAll(){
        return this.userService.getAllUser()
    }

    @UsePipes(new ValidationPipe())
    @Public()
    @Post()
    createUser(@Body('user') createUser: CreateUserDto){
        return this.userService.createUser(createUser)
    }

    
    @UsePipes(new ValidationPipe())
    @Post("profile/save-bio")
    saveProfile(@Body() bio:SaveBioDto, @CurrentUser() user: User){
        return this.userService.updateUserProfileBio(user, bio)
    }

    // @UsePipes(
    //     new ParseFilePipe({
    //         validators: [
    //             new MaxFileSizeValidator({
    //                 maxSize: 1 * 1024,
    //                 errorMessage:"Maximum allowed file size is 100KB"
    //             }),
    //             new FileTypeValidator({
    //                 fileType: /^image\/(png|jpeg)$/,
    //                 errorMessage:"Only image with jpeg or png allowed"
    //             }),
    //         ],
    //     }),
    // )
    @UseInterceptors(
        FileInterceptor('avatar', {
            storage: diskStorage({
                destination: AVATAR_UPLOAD_DIR,
                filename: (_req, file, callback) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    const ext = extname(file.originalname);
                    callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
                },
            }),
            fileFilter(_req, file, callback) {
                if (['image/jpeg', 'image/png'].includes(file.mimetype)) {
                    callback(null, true);
                } else {
                    callback(new UnprocessableEntityException({
                        errors:{avatar:['Only JPEG or PNG images are allowed']},
                        message:"Invalid user input."
                    }), false);
                }
            },
            limits:{fileSize:MAX_AVATAR_SIZE}
        }),
    )
    @Post('profile/avatar')
    uploadFile(@UploadedFile() file: Express.Multer.File, @CurrentUser() user: User) {
        return this.userService.updateUserProfileAvatar(user, file.path)
    }

    @Get("profile/avatar")
    serveAvatar(@CurrentUser() user: User): StreamableFile{
        return this.userService.serveProfileAvatar(user)
    }

}
