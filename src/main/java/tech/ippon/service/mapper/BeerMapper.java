package tech.ippon.service.mapper;

import org.mapstruct.*;
import tech.ippon.domain.Beer;
import tech.ippon.service.dto.BeerDTO;

/**
 * Mapper for the entity {@link Beer} and its DTO {@link BeerDTO}.
 */
@Mapper(componentModel = "spring")
public interface BeerMapper extends EntityMapper<BeerDTO, Beer> {}
