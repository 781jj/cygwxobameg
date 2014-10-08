//
//  VSUserManager.h
//  GameBox
//
//  Created by YaoMing on 14-10-8.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//

#import <Foundation/Foundation.h>


typedef  void(^VSUserReloadBlock)(BOOL success);
typedef  void(^VSUserGameReloadBlock)(BOOL success);

@interface VSUserManager : NSObject

@property (nonatomic,copy)NSString *name;
@property (nonatomic,copy)NSString *photoPath;
@property (nonatomic,strong)NSArray *userGame;

+ (VSUserManager *)shareInstance;


- (void)reload:(VSUserReloadBlock )callback;
- (void)reloadUserGame:(VSUserGameReloadBlock)callback;
@end
