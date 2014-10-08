//
//  VSBroast.m
//  GameBox
//
//  Created by YaoMing on 14-10-6.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//

#import "VSBroast.h"
#import "VSRequest.h"
#define VSPKTimerRefresh 60
static VSBroast *_PKHandle = nil;

@interface VSBroast ()
@property (nonatomic,strong)NSTimer *time;
@property (nonatomic,copy)VSBroastRefreshCallback calllback;

@end
@implementation VSBroast
+ (VSBroast *)handel
{
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        if (nil == _PKHandle) {
            _PKHandle = [[VSBroast alloc] init];
        }
    });
    return _PKHandle;
}

- (void)startRefresh:(VSBroastRefreshCallback )callback
{
    _calllback = callback;
    _time = [NSTimer timerWithTimeInterval:VSPKTimerRefresh target:self selector:@selector(refresh:) userInfo:nil repeats:YES];
}

- (void)refresh:(id)sender
{
    __weak typeof (self) blockself = self;
    [VSRequest get:@"123" params:nil success:^(NSURLRequest *request, id obj) {
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
