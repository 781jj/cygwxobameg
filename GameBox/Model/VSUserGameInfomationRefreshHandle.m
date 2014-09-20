//
//  VSUserGameInfomationRefreshHandle.m
//  GameBox
//
//  Created by YaoMing on 14-9-20.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//

#import "VSUserGameInfomationRefreshHandle.h"
#import "VSRequest.h"
#define VSPKTimerRefresh 60
static VSUserGameInfomationRefreshHandle *_PKHandle = nil;

@interface VSUserGameInfomationRefreshHandle ()
@property (nonatomic,strong)NSTimer *time;
@property (nonatomic,copy)VSChannelRefreshCallback calllback;

@end
@implementation VSUserGameInfomationRefreshHandle
+ (VSUserGameInfomationRefreshHandle *)handel
{
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        if (nil == _PKHandle) {
            _PKHandle = [[VSUserGameInfomationRefreshHandle alloc] init];
        }
    });
    return _PKHandle;
}

- (void)startRefresh:(VSChannelRefreshCallback )callback
{
    _calllback = callback;
    _time = [NSTimer timerWithTimeInterval:VSPKTimerRefresh target:self selector:@selector(refresh:) userInfo:nil repeats:YES];
}

- (void)refresh:(id)sender
{
    __weak typeof (self) blockself = self;
    [VSRequest request:SERVER_NAME params:nil success:^(NSURLRequest *request, id obj) {
        blockself.calllback(YES,obj);
    } failed:^(NSURLRequest *request, id obj, NSError *error) {
        blockself.calllback(NO,obj);
    }];
}


- (void)cancle
{
    if ([_time isValid]) {
        [_time invalidate];
        _time = nil;
    }
}
@end
