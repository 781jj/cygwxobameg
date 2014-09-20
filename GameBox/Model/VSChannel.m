//
//  VSChannel.m
//  GameBox
//
//  Created by YaoMing on 14-9-20.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//

#import "VSChannel.h"
#import "VSRequest.h"
@implementation VSChannel
- (id)initWithType:(VSChannelType )type
{
    self = [super init];
    if (self) {
        _type = type;
    }
    return self;
}

- (void)loadData:(VSChannelLoadDataBlock)callback
{
    NSString *parm = @"new";
    if (_type == VSHotChannel) {
        parm = @"hot";
    }
    [VSRequest request:SERVER_NAME params:@{@"listType":parm} success:^(NSURLRequest *request, id obj) {
        callback(YES,obj);
    } failed:^(NSURLRequest *request, id obj, NSError *error) {
        callback(NO,obj);
    }];
}
@end
