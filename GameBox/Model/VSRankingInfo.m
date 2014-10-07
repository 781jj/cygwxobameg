//
//  VSRankingInfo.m
//  GameBox
//
//  Created by YaoMing on 14-10-7.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//

#import "VSRankingInfo.h"

@implementation VSRankingInfo
- (id)initWithDic:(NSDictionary *)dic
{
#warning 没数据
    self = [super init];
    if (self) {
        _playerId = [dic objectForKey:@"_id"];
        _playerName = [dic objectForKey:@"name"];
        _gender = 1;
        
        _gameId = [dic objectForKey:@"gamenumber"];
        _currentRanking = 1;
        _oldRanking = 44;
        _score = @"178";
    }
    return self;
}
@end
