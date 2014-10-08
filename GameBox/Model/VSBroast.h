//
//  VSBroast.h
//  GameBox
//
//  Created by YaoMing on 14-10-6.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//

#import <Foundation/Foundation.h>


typedef  void(^VSBroastRefreshCallback)(BOOL,id message);

@interface VSBroast : NSObject

+ (VSBroast *)handel;

- (void)startRefresh:(VSBroastRefreshCallback )callback;
- (void)cancle;

@end
