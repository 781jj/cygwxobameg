//
//  VSPassport.h
//  GameBox
//
//  Created by YaoMing on 14-9-29.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//

#import <Foundation/Foundation.h>
typedef  void(^VSPassportLoginCallback)(BOOL,id);

@interface VSPassport : NSObject
{
    NSString *_passportUserId;
}
@property (nonatomic,assign)BOOL isLogin;
@property (nonatomic,copy)NSString *userName;
@property (nonatomic,copy)NSString *userId;
- (void)doLogin:(VSPassportLoginCallback)finish;
- (void)doLogout;
@end
