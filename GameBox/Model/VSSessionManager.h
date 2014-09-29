//
//  VSSessionManager.h
//  GameBox
//
//  Created by YaoMing on 14-9-29.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//

#import <Foundation/Foundation.h>
typedef  void(^VSSessionLoginCallback)(BOOL,id);

@class VSLoginMessage;
@class  VSPassport;
@interface VSSessionManager : NSObject

@property (nonatomic,strong)VSPassport *passport;
@property (nonatomic,assign)BOOL isLogin;
+ (VSSessionManager *)shareInstance;
- (void)loginWithType:(VSLoginMessage *)info finish:(VSSessionLoginCallback)finish;
- (void)logout;

@end
