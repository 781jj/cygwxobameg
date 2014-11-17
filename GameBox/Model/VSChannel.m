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
        
      
    }
    return self;
}

- (void)loadData:(VSChannelLoadDataBlock)callback
{
    

//    NSString *parm = @"new";
//    if (_type == VSHotChannel) {
//        parm = @"hot";
//    }
//    
//
//    
//    __weak typeof(self) blockself = self;
//    [VSRequest get:@"games/gamelist" params:@{@"listType":parm} success:^(NSURLRequest *request, id obj) {
//        if ([obj isKindOfClass:[NSDictionary class]]) {
//            if ([[obj objectForKey:@"returnCode"] integerValue] == 1) {
//                NSDictionary *dic = [obj objectForKey:@"data"];
//
//                NSMutableArray *array = [NSMutableArray array];
//                NSMutableArray *favor = [NSMutableArray array];
//                if([dic objectForKey:@"gamelist"]){
//                    NSArray *list = (NSArray *)[dic objectForKey:@"gamelist"];
//                    [list enumerateObjectsUsingBlock:^(id obj, NSUInteger idx, BOOL *stop) {
//                        VSGameDetailInfo *info = [[VSGameDetailInfo alloc] initWithDic:obj];
//                        [array addObject:info];
//                        
//                        
//                    }];
//                }
//                
//                
//                if (blockself.type == 1) {
//                    VSGameDetailInfo *gameInfo1 = [[VSGameDetailInfo alloc] initWithGameId:@"48"];
//                    VSGameDetailInfo *gameInfo2 = [[VSGameDetailInfo alloc] initWithGameId:@"49"];
//                    [favor addObjectsFromArray:@[gameInfo1,gameInfo2]];
//                    VSFavorGame *favorGame = [VSFavorGame new];
//                    favorGame.favorlist = favor;
//                    [array insertObject:favorGame atIndex:0];
//                }else{
//                    VSGameDetailInfo *gameInfo1 = [[VSGameDetailInfo alloc] initWithGameId:@"56"];
//                    VSGameDetailInfo *gameInfo2 = [[VSGameDetailInfo alloc] initWithGameId:@"3"];
//                    [favor addObjectsFromArray:@[gameInfo1,gameInfo2]];
//                    VSFavorGame *favorGame = [VSFavorGame new];
//                    favorGame.favorlist = favor;
//                    [array insertObject:favorGame atIndex:0];
//                }
//    
//                blockself.gameList = array;
//                callback(YES,array);
//            }else{
//               callback(NO,obj);
//            }
//        }else{
//             callback(NO,obj);
//        }
//       
//    } failed:^(NSURLRequest *request, id obj, NSError *error) {
//        callback(NO,obj);
//    }];
}

- (void)loadJson
{
    NSString *jsonFile = [NSBundle pathForResource:@"game" ofType:@"json" inDirectory:[[NSBundle mainBundle]  bundlePath]];
    NSData *data = [NSData dataWithContentsOfFile:jsonFile];
    NSError *error ;
    id json =[NSJSONSerialization
              JSONObjectWithData:data
              options:kNilOptions
              error:&error];
    NSMutableArray *array = [NSMutableArray array];
    
    if ([json isKindOfClass:[NSArray class]]) {
        [json enumerateObjectsUsingBlock:^(id obj, NSUInteger idx, BOOL *stop) {
            VSGameDetailInfo *info = [[VSGameDetailInfo alloc] initWithDic:obj];
            [array addObject:info];
        }];
    }
   
    
    NSMutableArray *favor = [NSMutableArray array];
    VSGameDetailInfo *gameInfo1 = [[VSGameDetailInfo alloc] initWithGameId:@"56"];
    VSGameDetailInfo *gameInfo2 = [[VSGameDetailInfo alloc] initWithGameId:@"3"];
    [favor addObjectsFromArray:@[gameInfo1,gameInfo2]];
    VSFavorGame *favorGame = [VSFavorGame new];
    favorGame.favorlist = favor;
    [array insertObject:favorGame atIndex:0];
     _gameList = array;
}



@end
