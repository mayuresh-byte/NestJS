import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
    constructor(private prisma: PrismaService) {}

    getBookmarks(userId: number) {
        return this.prisma.bookmark.findMany({
            where: {
                userId: userId
            }
        });
    }

    getBookmarkById(userId: number, bookmarkId: number) {
        return this.prisma.bookmark.findFirst({
            where: {
                id: bookmarkId,
                userId: userId
            }
        })
    }

    async createBookmark(userId: number, dto: CreateBookmarkDto) {
        const bookmark = await this.prisma.bookmark.create({
            data: {
                userId: userId,
                ...dto

            }
        });

        return bookmark;
    }

    async editBookmarById(userId: number, bookmarkId: number, dto: EditBookmarkDto) {
        const bookmark = await this.prisma.bookmark.findUnique({
            where: {
                id: bookmarkId
            }
        });

        if (!bookmark || bookmark.userId !== userId) {
            throw new ForbiddenException('Access to resource denied !')
        }

        return this.prisma.bookmark.update({
            where: {
                id: bookmarkId
            },
              data: {
                ...dto
            }
        });
    }

    async deleteBookmarkById(userId: number, bookmarkId: number) {
        const bookmark = await this.prisma.bookmark.findUnique({
            where: {
                id: bookmarkId
            }
        });

        if (!bookmark || bookmark.userId !== userId) {
            throw new ForbiddenException('Access to resource denied !')
        }

        await this.prisma.bookmark.delete({
            where: {
                id: bookmarkId
            }
        });

        return `Bookmark with id ${bookmarkId} deleted`

    }
}
