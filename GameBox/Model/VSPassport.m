//
//  VSPassport.m
//  GameBox
//
//  Created by YaoMing on 14-9-29.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//

#import "VSPassport.h"
#import "VSRequest.h"
#import "VSRankingInfo.h"
@implementation VSPassport
- (void)doLogin:(VSPassportLoginCallback)finish;
{
    
}
- (void)doLogout
{
    
}

- (NSString *)userId
{
    return _passportUserId;
}

- (void)reloadInfo:(VSUserReloadBlock )callback
{
    if (!self.isLogin) {
        callback(NO);
        return;
    }
    
    __weak typeof (self) blockself = self;
    [VSRequest get:@"games/userimygamelistnfo" params:@{@"userid":self.userId} success:^(NSURLRequest *request , id obj) {
        if ([obj isKindOfClass:[NSDictionary class]]) {
            if ([[obj objectForKey:@"returnCode"] integerValue] == 1) {
                
                NSDictionary *dic = [obj objectForKey:@"data"];
                if (dic) {
                    blockself.userName = [dic objectForKey:@"name"];
                    blockself.photo = [dic objectForKey:@"iconurl"];
                    blockself.gender = [[dic objectForKey:@"female"] isEqualToString:@"female"]?0:1;
                    
                    NSArray *array = [dic objectForKey:@"mygamelist"];
                    NSMutableArray *result = [NSMutableArray array];
                    for (NSDictionary *gameRank in array) {
                        VSRankingInfo *rank = [[VSRankingInfo alloc] initWithDic:gameRank];
                        [result addObject:rank];
                    }
                    blockself.gameList = result;
                }
                callback(YES);
                return ;
            }
        }
        callback(NO);
    } failed:^(NSURLRequest *request , id msg, NSError *error) {
        callback(NO);
    }];
}



@end
