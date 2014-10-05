//
//  VSGameAbstractTableViewCell.h
//  GameBox
//
//  Created by YaoMing on 14-10-5.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//

#import <UIKit/UIKit.h>
#define VSGameAbstractTableViewCellHeight  81

@interface VSGameAbstractTableViewCell : UITableViewCell
- (id)initWithReuseId:(NSString *)reuseId AtIndex:(NSInteger )index;
- (void)update;
@end
