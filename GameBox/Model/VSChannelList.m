//
//  VSChannelList.m
//  GameBox
//
//  Created by YaoMing on 14-9-20.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//

#import "VSChannelList.h"


@interface VSChannelList ()
@property (nonatomic,strong)NSMutableArray *list;
@end
static VSChannelList *_channelList = nil;
@implementation VSChannelList
- (id)init
{
    self = [super init];
    if (self) {
        _list = [NSMutableArray array];
        NSArray *types = @[@"1",@"2"];
        __weak typeof(self) blockself = self;
        [types enumerateObjectsUsingBlock:^(id obj, NSUInteger idx, BOOL *stop) {
            NSInteger type = [obj integerValue];
            VSChannel *channel = [[VSChannel alloc] initWithType:type];
            [blockself.list addObject:channel];
        }];
    }
    return self;
}

+ (VSChannelList *)shareInstance{
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        if (nil == _channelList) {
            _channelList = [[VSChannelList alloc] init];
        }
    });
    return _channelList;
}

- (VSChannel *)currentChannel
{
    return [self channelWithType:_currentType];
}

- (VSChannel *)channelWithType:(VSChannelType)type
{
    for (VSChannel *channel in _list) {
        if (channel.type == type) {
            return channel;
        }
    }
    return nil;
}

@end
