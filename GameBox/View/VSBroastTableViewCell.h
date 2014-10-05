//
//  VSBroastTableViewCell.h
//  GameBox
//
//  Created by YaoMing on 14-10-5.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//

#import <UIKit/UIKit.h>
#define VSBroastTableViewCellHeight  56

@interface VSBroastTableViewCell : UITableViewCell
- (id)initWithReuseId:(NSString *)reuseId;
- (void)update;
@end
