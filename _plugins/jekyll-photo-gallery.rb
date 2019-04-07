module Jekyll
  class IncludeGalleryTag < Liquid::Tag

    def initialize(tag_name, text, tokens)
      super
      # this part generates the visible gallery on the page
      @result = '<div id="gallery" style="margin-bottom: 20px;">'
      photos = YAML::load_file('_data/photos.yml')
      count = 0
      photos.each do |photo, details|
        [nil, *details, nil].each_cons(3){|prev, curr, nxt|
          if(curr["album"] == text.strip)
            @result = @result+'<div itemscope itemtype="http://schema.org/Photograph">
                                 <a itemprop="image" class="swipebox" title="'+curr["title"]+'">
                                   <img data-value="'+count.to_s+'" class="gallery-image" alt="'+curr["title"]+'" itemprop="thumbnailUrl" src="/assets/images/posts/'+curr["img"]+'.jpg"/>
                                   <meta itemprop="name" content="'+curr["title"]+'" />
                                 </a>
                               </div>'

            count = count + 1
          end
        }
      end
      @result = @result + '</div>'

      # this part generates the invisible gallery that expands when an image is clicked
      @result = @result + '<div id="modal-container">
                              <span id="close">&times;</span>
                              <div id="modal-content">'
      count = 0
      photos.each do |photo, details|
        [nil, *details, nil].each_cons(3){|prev, curr, nxt|
          if(curr["album"] == text.strip)
            @result = @result+'<img data-value="'+count.to_s+'" class="modal-image" alt="'+curr["title"]+'" src="/assets/images/posts/'+curr["img"]+'.jpg"/>'
            count += 1
          end
        }
      end
      @result = @result+'<a id="prev">&#10094;</a>
                         <a id="next">&#10095;</a>
                      </div>
                       <div class="modal-caption-container">
                         <p id="modal-caption"></p>
                       </div>
                   </div>'
    end

    def render(context)
      "#{@result}"
    end
  end
end
Liquid::Template.register_tag('includeGallery', Jekyll::IncludeGalleryTag)
