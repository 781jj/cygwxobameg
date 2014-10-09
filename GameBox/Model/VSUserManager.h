//
//  VSUserManager.h
//  GameBox
//
//  Created by YaoMing on 14-10-9.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface VSUserManager : NSObject
+ (VSUserManager *)shareInstance;


- (void)updateUserPlayInfo;
@end
