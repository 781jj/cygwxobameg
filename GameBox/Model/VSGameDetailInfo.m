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
#import "VSRequest.h"
#import "VSRankingInfo.h"
@implementation VSGameDetailInfo



- (id)initWithDic:(NSDictionary *)dic
{
    self = [super init];
    if(self)
    {
        _players = 1234;
        _gameId = [dic objectForKey:@"gamenumber"] ;
    }
    return self;
}

- (id)initWithGameId:(NSString *)gameID
{
    self = [super init];
    if(self)
    {
        _players = 1234;
        _gameId = gameID;
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

- (NSArray *)rankList
{
    return _rankings;
}

- (void)rankingList:(VSGameRankBlock)callback
{
    [VSRequest get:@"games/gamerank" params:@{@"gamenumber":_gameId} success:^(NSURLRequest *request, id obj) {
        if ([obj isKindOfClass:[NSDictionary class]]) {
            if ([[obj objectForKey:@"returnCode"] integerValue] == 1) {
                NSArray *list = [obj objectForKey:@"data"];
                if ([list count]>0) {
                    NSMutableArray *array  = [NSMutableArray array];
                    for (NSDictionary *dic in list) {
                        VSRankingInfo *info = [[VSRankingInfo alloc] initWithDic:dic];
                        [array addObject:info];
                    }
                    _rankings = array;
                    callback(YES,array);
                }
            }
        }
        callback(NO,nil);
    }failed:^(NSURLRequest * request, id msg, NSError * error) {
         callback(NO,nil);
    }];
}



@end
