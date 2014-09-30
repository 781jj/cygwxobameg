//
//  VSGameDetailInfo.m
//  GameBox
//
//  Created by YaoMing on 14-9-20.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//

#import "VSGameDetailInfo.h"
#import "VSGameImage.h"
#import "VSGameHtml.h"
#import "VSGameText.h"
@implementation VSGameDetailInfo



- (id)initWithDic:(NSDictionary *)dic
{
    self = [super init];
    if(self)
    {
        _gameId = [dic objectForKey:@"gamenumber"] ;
    }
    return self;
}


- (NSString *)iconPath
{
    return [[VSGameImage shareInstance] iconPath:_gameId];
}

- (NSArray *)showImagesPath
{
    return [[VSGameImage shareInstance] galleryPath:_gameId];
}

- (NSString *)htmlPath
{
    return [[VSGameHtml shareInstance] htmlPath:_gameId];
}

- (NSString *)name
{
    return [[VSGameText shareInstance] gameName:_gameId];
}

- (NSString *)abstract
{
    return [[VSGameText shareInstance] gameAbstract:_gameId];
}

- (NSString *)shareInfo
{
    return [[VSGameText shareInstance] gameShare:_gameId];
}
@end
