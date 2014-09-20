
//
//  VSChannelList.h
//  GameBox
//
//  Created by YaoMing on 14-9-20.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "VSChannel.h"
@interface VSChannelList : NSObject

@property (nonatomic,assign)VSChannelType currentType;
+ (VSChannelList *)shareInstance;

- (VSChannel *)currentChannel;
- (VSChannel *)channelWithType:(VSChannelType)type;
@end
