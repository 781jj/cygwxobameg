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
@implementation VSGameDetailInfo



- (id)initWithDic:(NSDictionary *)dic
{
    self = [super init];
    if(self)
    {
        _gameId = [[dic objectForKey:@"id"] stringValue];
        _name = [dic objectForKey:@"name"];
        _description = [dic objectForKey:@"description"];
        _shareInfo = [dic objectForKey:@"share"];
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
@end
