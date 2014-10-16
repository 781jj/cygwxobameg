//
//  VSFacebookLoginHold.h
//  GameBox
//
//  Created by YaoMing on 14-10-15.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <FacebookSDK/FacebookSDK.h>
typedef  void(^VSFacebookLoginBlock)(BOOL success );

@interface VSFacebookLoginHold : NSObject
+ (VSFacebookLoginHold *)shareInstance;
- (void)sessionStateChanged:(FBSession *)session state:(FBSessionState) state error:(NSError *)error finished:(VSFacebookLoginBlock) finish;
@end
