//
//  VSTempPassport.m
//  GameBox
//
//  Created by YaoMing on 14-9-29.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//

#import "VSTempPassport.h"
#import "VSRequest.h"
@implementation VSTempPassport
- (void)doLogin:(VSPassportLoginCallback)finish;
{
    [VSRequest request:@"users/register" method:@"POST" params:nil success:^(NSURLRequest * request , id info) {
        NSDictionary *dic = (NSDictionary *)info;
        if ([dic objectForKey:@"code"]) {
            if ([[dic objectForKey:@"code"] integerValue] == 1) {
                NSDictionary *data = [dic objectForKey:@"data"];
                if (data && [data objectForKey:@"_id"]) {
                    self.userId = [data objectForKey:@"_id"];
                    [self storeInfo];
                     finish(YES,info);
                }else{
                     finish(NO,info);
                }
                
               
            }else{
                finish(NO,info);
            }
        }else{
            finish(NO,info);
        }
        
    } failed:^(NSURLRequest *request, id info, NSError *error) {
        finish(NO,info);
    }];
}
- (void)doLogout
{
    
}

- (void)storeInfo
{
    NSData  *data = [NSKeyedArchiver archivedDataWithRootObject:self];
    NSUserDefaults *user = [NSUserDefaults standardUserDefaults];
    [user setObject:data forKey:@"VSPassportLoginInfo"];
    [user synchronize];
}

- (BOOL)isLogin
{
    return self.userId && ![self.userId isEqualToString:@""];
}

#pragma mark -- coder delegate
-(id) initWithCoder: (NSCoder *) aDecoder{
    if (self = [super init]) {
        _passportUserId = [aDecoder decodeObjectForKey:@"userId"];
    }
    return self;
}

-(void) encodeWithCoder: (NSCoder *) aCoder{
    [aCoder encodeObject:_passportUserId forKey:@"userId"];
}

@end
