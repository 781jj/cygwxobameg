//
//  VSGameImage.m
//  GameBox
//
//  Created by YaoMing on 14-9-24.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//

#import "VSGameImage.h"
static VSGameImage *_gameImage = nil;
@interface VSGameImage ()
@property (nonatomic ,copy)NSString *gameImagePath;
@end
@implementation VSGameImage
- (id)init
{
    self = [super init];
    if (self) {
        NSString *home = [[NSBundle mainBundle] resourcePath];
        NSString *bundleFound = [home stringByAppendingPathComponent:@"game_bundle"];
        NSBundle *bundle = [NSBundle bundleWithPath:[bundleFound stringByAppendingPathComponent:@"game_image.bundle"]];
        _gameImagePath = [bundle resourcePath];
        
    }
    return self;
}

+ (VSGameImage *)shareInstance{
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        if (nil == _gameImage) {
            _gameImage = [[VSGameImage alloc] init];
        }
    });
    return _gameImage;
}


- (NSString *)iconPath:(NSString *)gameId
{
    NSString *gameFoulder = [_gameImagePath stringByAppendingPathComponent:gameId];
    return [gameFoulder stringByAppendingPathComponent:@"icon.png"];
}

- (NSString *)bigImagePath:(NSString *)gameId
{
    NSString *gameFoulder = [_gameImagePath stringByAppendingPathComponent:gameId];
    gameFoulder = [gameFoulder stringByAppendingPathComponent:@"big.jpg"];
    if ([[NSFileManager defaultManager] fileExistsAtPath:gameFoulder]) {
        return gameFoulder;
    }else{
        return [self iconPath:gameId];
    }
}

- (NSArray *)galleryPath:(NSString *)gameId
{
    NSString *gameFoulder = [_gameImagePath stringByAppendingPathComponent:gameId];

    NSMutableArray *array = [NSMutableArray array];
    for (int i = 1; i<5; i++) {
        NSString *pic = [NSString stringWithFormat:@"%d.jpg",i];
        NSString *path = [gameFoulder stringByAppendingPathComponent:pic];
        [array addObject:path];
    }
    return array;
}
@end
