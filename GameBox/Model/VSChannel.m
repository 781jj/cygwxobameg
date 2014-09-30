//
//  VSChannel.m
//  GameBox
//
//  Created by YaoMing on 14-9-20.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//

#import "VSChannel.h"
#import "VSRequest.h"
#import "VSGameDetailInfo.h"
#import "VSFavorGame.h"
#import "VSGameBroadcast.h"
@implementation VSChannel
- (id)initWithType:(VSChannelType )type
{
    self = [super init];
    if (self) {
        _type = type;
        
     //   [self loadJson];
      
    }
    return self;
}

- (void)loadData:(VSChannelLoadDataBlock)callback
{
    NSString *parm = @"new";
    if (_type == VSHotChannel) {
        parm = @"hot";
    }
    
    __weak typeof(self) blockself = self;
    [VSRequest get:@"games/gamelist" params:@{@"listType":parm} success:^(NSURLRequest *request, id obj) {
        if ([obj isKindOfClass:[NSDictionary class]]) {
            NSMutableArray *array = [NSMutableArray array];
            if ([[obj objectForKey:@"returnCode"] integerValue] == 1) {
                NSDictionary *dic = [obj objectForKey:@"data"];
                if ([dic objectForKey:@"favorlist"]) {
                    NSArray *list = (NSArray *)[dic objectForKey:@"favorlist"];
                    if (list && [list count]>0) {
                        NSMutableArray *favor = [NSMutableArray array];
                        [list enumerateObjectsUsingBlock:^(id obj, NSUInteger idx, BOOL *stop) {
                            VSGameDetailInfo *info = [[VSGameDetailInfo alloc] initWithDic:obj];
                            [favor addObject:info];
                        }];
                        VSFavorGame *favorGame = [VSFavorGame new];
                        favorGame.favorlist = favor;
                        [array addObject:favor];
                    }
                }
  
                [array addObject:[VSGameBroadcast shareInstance]];
                if([dic objectForKey:@"gamelist"]){
                    NSArray *list = (NSArray *)[dic objectForKey:@"gamelist"];
                    [list enumerateObjectsUsingBlock:^(id obj, NSUInteger idx, BOOL *stop) {
                        VSGameDetailInfo *info = [[VSGameDetailInfo alloc] initWithDic:obj];
                        [array addObject:info];
                    }];
                }
                
                
                blockself.gameList = array;
            }else{
               callback(NO,obj);
            }
        }else{
             callback(NO,obj);
        }
       
    } failed:^(NSURLRequest *request, id obj, NSError *error) {
        callback(NO,obj);
    }];
}




@end
