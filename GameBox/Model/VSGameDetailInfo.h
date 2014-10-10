//
//  VSGameDetailInfo.h
//  GameBox
//
//  Created by YaoMing on 14-9-20.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//

#import <Foundation/Foundation.h>
typedef  void(^VSGameRankBlock)(BOOL success,NSArray *rankList);


@interface VSGameDetailInfo : NSObject
{
    NSArray *_rankings;
}

@property (nonatomic,copy)NSString *name;
@property (nonatomic,copy)NSString *gameId;
@property (nonatomic,readonly)NSString *iconPath;
@property (nonatomic,copy)NSString *abstract;
//玩法
@property (nonatomic,copy)NSString *gameplay;
@property (nonatomic,assign)NSInteger players;
@property (nonatomic,readonly)NSArray *showImagesPath;
@property (nonatomic,strong)NSString *shareInfo;
@property (nonatomic,readonly)NSString *htmlPath;
@property (nonatomic,readonly)NSArray *rankList;
@property (nonatomic,assign)BOOL isFavor;


- (id)initWithDic:(NSDictionary *)dic;
- (id)initWithGameId:(NSString *)gameID;
- (void)rankingList:(VSGameRankBlock)callback;
@end
