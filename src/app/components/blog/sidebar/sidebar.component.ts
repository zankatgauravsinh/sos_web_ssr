import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';

import { BlogRecentPostComponent } from './blog-recent-post/blog-recent-post.component';
import { BlogCategoryComponent } from './blog-category/blog-category.component';
import { BlogTagComponent } from './blog-tag/blog-tag.component';
import { SkeletonBlogComponent } from '../skeleton-blog/skeleton-blog.component';

import { BlogState } from '../../../shared/store/state/blog.state';
import { CategoryState } from '../../../shared/store/state/category.state';
import { TagState } from '../../../shared/store/state/tag.state';

import { GetRecentBlog } from '../../../shared/store/action/blog.action';
import { GetTags } from '../../../shared/store/action/tag.action';
import { GetCategories } from '../../../shared/store/action/category.action';

import { Blog } from '../../../shared/interface/blog.interface';
import { Category, CategoryModel } from '../../../shared/interface/category.interface';
import { TagModel } from '../../../shared/interface/tag.interface';

import { BlogService } from '../../../shared/services/blog.service';
import { NoDataComponent } from '../../../shared/components/widgets/no-data/no-data.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule,
            BlogRecentPostComponent, BlogCategoryComponent, BlogTagComponent, SkeletonBlogComponent,
            NoDataComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  @Select(BlogState.resentBlog) resentBlog$: Observable<Blog[]>;
  @Select(CategoryState.category) category$: Observable<CategoryModel>;
  @Select(TagState.tag) tag$: Observable<TagModel>;

  public category: Category[];

  constructor(public blogService: BlogService, private store: Store){
    this.store.dispatch(new GetTags({status: 1, type: 'post'}))
    this.store.dispatch(new GetRecentBlog({status: 1, type: 'post', paginate: '5'}))
    this.store.dispatch(new GetCategories({status: 1, type: 'post'})).subscribe((result) => {
      this.category = result.category.category.data;
    })
  }
}
