//
//  VSParamLoginMessage.h
//  GameBox
//
//  Created by YaoMing on 14-9-29.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//

#import "VSLoginMessage.h"

@interface VSParamLoginMessage : VSLoginMessage
@property (nonatomic,copy)NSString *userName;
@property (nonatomic,copy)NSString *nickName;
@end
