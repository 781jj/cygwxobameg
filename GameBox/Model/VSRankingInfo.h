//
//  VSRankingInfo.h
//  GameBox
//
//  Created by YaoMing on 14-10-7.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface VSRankingInfo : NSObject

@property (nonatomic,copy)NSString *playerName;
@property (nonatomic,copy)NSString *playerId;
@property (nonatomic,assign)NSInteger gender;
@property (nonatomic,copy)NSString* photoPath;


@property (nonatomic,copy)NSString *gameId;
@property (nonatomic)NSInteger currentRanking;
@property (nonatomic)NSInteger oldRanking;
@property (nonatomic,copy)NSString * score;
- (id)initWithDic:(NSDictionary *)dic;
@end
