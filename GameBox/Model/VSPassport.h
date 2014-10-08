//
//  VSPassport.h
//  GameBox
//
//  Created by YaoMing on 14-9-29.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//

#import <Foundation/Foundation.h>
typedef  void(^VSPassportLoginCallback)(BOOL,id);
typedef  void(^VSUserReloadBlock)(BOOL success);
@interface VSPassport : NSObject
{
    NSString *_passportUserId;
}
@property (nonatomic,assign)BOOL isLogin;
@property (nonatomic,copy)NSString *userName;
@property (nonatomic,copy)NSString *userId;
@property (nonatomic,copy)NSString *photo;
@property (nonatomic)NSInteger gender;
@property (nonatomic,strong)NSArray *gameList;
- (void)doLogin:(VSPassportLoginCallback)finish;
- (void)doLogout;

- (void)reloadInfo:(VSUserReloadBlock )callback;
@end
