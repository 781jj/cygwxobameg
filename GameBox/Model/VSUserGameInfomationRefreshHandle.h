//
//  VSUserGameInfomationRefreshHandle.h
//  GameBox
//
//  Created by YaoMing on 14-9-20.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//

#import <Foundation/Foundation.h>
typedef  void(^VSChannelRefreshCallback)(BOOL,id message);

@interface VSUserGameInfomationRefreshHandle : NSObject

+ (VSUserGameInfomationRefreshHandle *)handel;

- (void)startRefresh:(VSChannelRefreshCallback )callback;
- (void)cancle;

@end
